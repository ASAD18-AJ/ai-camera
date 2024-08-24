import prisma from "../../config/prismaClient.js";
import { getThumbnail } from "../../utils/extractThumbnail.js";

// const faceDetectionService = async (imagepath) => {};

const suspectSearchService = async (
  cameras,
  classes,
  startTime,
  endTime,
  top_color,
  bottom_color,
  employeeId,
) => {
  // Get cameras' details involved in the operation
  const camerasEngagedInOperation = await prisma.camera.findMany({
    where: {
      cameraId: typeof cameras === "string" ? cameras : { in: cameras },
    },
    select: {
      cameraIp: true,
      cameraId: true,
      location: true,
    },
  });

  // log this operation
  const newOperation = await prisma.operationLog.create({
    data: {
      operationType: "SUSPECT SEARCH",
      cameras: {
        connect: camerasEngagedInOperation.map((camera) => ({
          cameraId: camera?.cameraId,
        })),
      },
      operationRequestData: {
        classes: classes,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        topColor: top_color,
        bottomColor: bottom_color,
      },
      initialTimestamp: new Date(),
      finalTimestamp: new Date(),
      userId: employeeId,
      closeTimestamp: new Date(),
    },
  });

  let results = await prisma.detectionLog.findMany({
    where: {
      OR: [
        {
          metadata: {
            path: ["top"],
            equals: top_color,
          },
        },
        {
          metadata: {
            path: ["bottom"],
            equals: bottom_color,
          },
        },
      ],
      AND: [
        {
          cameraId: {
            in: cameras,
          },
        },
        {
          timestamp: {
            gte: new Date(startTime),
            lte: new Date(endTime),
          },
        },
        {
          detectionClass: {
            in: classes,
          },
        },
      ],
    },
    distinct: ["trackId"],
  });

  if (!results || results.length === 0) {
    return [];
  }

  const thumbnailPromises = results.map(async (result) => {
    const thumbnailPath = await getThumbnail(
      "D:\\RJ ai cam\\traffic_light.mp4",
      result?.timestamp,
    );
    result.thumbnail = thumbnailPath;
    return result;
  });

  results = await Promise.all(thumbnailPromises);
  await prisma.operationLog.update({
    where: {
      id: newOperation?.id,
    },
    data: {
      operationResponseData: {
        results: results,
      },
      finalTimestamp: new Date(),
      closeTimestamp: new Date(),
      operationStatus: "INACTIVE",
    },
  });

  return results;
};

const getClasses = async (objectType) => {
  if (objectType) {
    const result = await prisma.class.findMany({
      where: {
        objectType: objectType,
      },
    });
    return result;
  }
  const result = await prisma.class.findMany();
  return result;
};

const anprOperationService = async (
  cameras,
  startTime,
  endTime,
  licensePlate,
  employeeId,
  ownerName,
) => {
  // Get cameras' details involved in the operation
  const camerasEngagedInOperation = await prisma.camera.findMany({
    where: {
      cameraId: typeof cameras === "string" ? cameras : { in: cameras },
    },
    select: {
      cameraIp: true,
      cameraId: true,
      location: true,
    },
  });

  //log this operation
  const newAnprOperation = await prisma.operationLog.create({
    data: {
      operationType: "ANPR",
      cameras: {
        connect: camerasEngagedInOperation.map((camera) => ({
          cameraId: camera?.cameraId,
        })),
      },
      operationRequestData: {
        licensePlateNumber:
          !ownerName && licensePlate ? licensePlate.toLowerCase() : null,
        startTime: startTime,
        endTime: endTime,
        vehicleOwnerName:
          !licensePlate && ownerName ? ownerName.toLowerCase() : null,
      },
      initialTimestamp: new Date(),
      finalTimestamp: new Date(),
      userId: employeeId,
      closeTimestamp: new Date(),
    },
  });

  const license_number = licensePlate ? licensePlate.toLowerCase() : null;
  const owner_name = ownerName ? ownerName.toLowerCase() : null;

  const filters = [];
  if (ownerName && licensePlate) {
    filters.push({
      AND: [
        {
          license_number: {
            equals: license_number,
          },
        },
        {
          meta_data: {
            path: ["owner_name"],
            equals: owner_name,
          },
        },
      ],
    });
  } else if (licensePlate) {
    filters.push({
      license_number: {
        equals: license_number,
      },
    });
  } else if (ownerName) {
    filters.push({
      meta_data: {
        path: ["owner_name"],
        equals: owner_name,
      },
    });
  }

  const query = {
    where: {
      AND: [
        {
          OR: filters,
        },
        {
          camera_id: {
            in: cameras,
          },
        },
        {
          time_stamp: {
            gte: new Date(startTime),
            lte: new Date(endTime),
          },
        },
      ],
    },
    distinct: ["trackId"],
  };

  let results = await prisma.anprLogs.findMany(query);
  if (!results || results.length === 0) {
    return [];
  }

  const thumbnailPromises = results.map(async (result) => {
    const thumbnailPath = await getThumbnail(
      "D:\\RJ ai cam\\traffic_light.mp4",
      result?.time_stamp,
    );
    result.thumbnail = thumbnailPath;
    return result;
  });

  results = await Promise.all(thumbnailPromises);

  // update operation log
  await prisma.operationLog.update({
    where: {
      id: newAnprOperation?.id,
    },
    data: {
      operationResponseData: {
        results: results,
      },
      finalTimestamp: new Date(),
      closeTimestamp: new Date(),
      operationStatus: "INACTIVE",
    },
  });

  return results;
};

// utility functions
export { suspectSearchService, getClasses, anprOperationService };
