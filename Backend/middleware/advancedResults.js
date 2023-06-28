//model, populate,

export const advancedResults = (model, populate) => {
  return async (req, res, next) => {
    //anytime we search for query without AWAIT, we receive a query on which we can perform operaitons (use any method)
    let TeachersQuery = model.find();

    //query string ? -- admin?limit=2&page=2
    //convert string to num

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;
    const skip = (page - 1) * limit;
    //get total records
    const total = await model.countDocuments();

    //populate
    if (populate) {
      TeachersQuery = TeachersQuery.populate(populate);
    }

    //filtering the result using regex
    if (req.query.name) {
      TeachersQuery = TeachersQuery.find({
        name: { $regex: req.query.name, $options: "i" },
      });
    }

    //Pagination results
    const pagination = {};

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    //add prev
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
    let teachers = null;

    //params /:id
    //if page or limit are 0, send all
    if (isNaN(Number(req.query.page)) && isNaN(Number(req.query.limit))) {
      teachers = await TeachersQuery.find();
    } else {
      teachers = await TeachersQuery.find().skip(skip).limit(limit);
    }

    res.results = {
      status: "success",
      message: "fetched successfully",
      data: teachers,
    };

    next();
  };
};
