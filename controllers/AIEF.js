const getAllAIEF = async (req, res) => {
  const {
    major,
    workType,
    location,
    compensation,
    targetGroup,
    sort,
    deadline,
    industry,
    page = 1,
    limit = 10,
  } = req.query;

  let queryObject = {};

  if (deadline && deadline !== "All") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (deadline === "active") {
      queryObject.deadline = { $gte: today };
    } else if (deadline === "expired") {
      queryObject.deadline = { $lt: today };
    } else if (!isNaN(new Date(deadline))) {
      const selectedDate = new Date(deadline);
      const nextDate = new Date(selectedDate);
      nextDate.setDate(nextDate.getDate() + 1);

      queryObject.deadline = {
        $gte: selectedDate,
        $lt: nextDate,
      };
    }
  }

  if (industry && industry !== "All") {
    queryObject.industry = industry;
  }

  if (major && major !== "All") {
    queryObject.requiredMajor = { $in: [major, "All"] };
  }

  if (targetGroup && targetGroup !== "All") {
    queryObject.targetGroup = { $in: [targetGroup, "All"] };
  }

  if (workType && workType !== "All") {
    queryObject.workType = workType;
  }

  if (compensation && compensation !== "All") {
    queryObject.compensation = compensation;
  }

  if (location && location !== "All") {
    queryObject.location = { $regex: location, $options: "i" };
  }

  let result = AIEF.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  } else if (sort === "oldest") {
    result = result.sort("createdAt");
  } else if (sort === "a-z") {
    result = result.sort("internshipTitle");
  } else if (sort === "z-a") {
    result = result.sort("-internshipTitle");
  } else {
    result = result.sort("-createdAt");
  }

  const pageNumber = Math.max(Number(page) || 1, 1);
  const limitNumber = Math.max(Number(limit) || 10, 1);
  const skip = (pageNumber - 1) * limitNumber;

  result = result.skip(skip).limit(limitNumber);

  const jobs = await result;
  const totalJobs = await AIEF.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limitNumber);

  res.status(StatusCodes.OK).json({
    jobs,
    totalJobs,
    numOfPages,
    currentPage: pageNumber,
  });
};

const getAIEF = async (req, res) => {
  const { id: aiefId } = req.params;

  const job = await AIEF.findById(aiefId);

  if (!job) {
    throw new NotFoundError(`No opportunity found with id ${aiefId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const createAIEF = async (req, res) => {
  const job = await AIEF.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateAIEF = async (req, res) => {
  const { id: aiefId } = req.params;

  const job = await AIEF.findByIdAndUpdate(aiefId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    throw new NotFoundError(`No opportunity found with id ${aiefId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteAIEF = async (req, res) => {
  const { id: aiefId } = req.params;

  const job = await AIEF.findByIdAndDelete(aiefId);

  if (!job) {
    throw new NotFoundError(`No opportunity found with id ${aiefId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "Opportunity removed" });
};
