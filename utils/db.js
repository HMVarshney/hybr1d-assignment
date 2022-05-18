async function getPaginate(req, Model) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const sort = req.query.sort || "-createdAt";
  const populates = req.query.populates || "";
  const skip = (page - 1) * limit;

  if (req.query.search) {
    req.query["$text"] = { $search: req.query.search };
    delete req.query.search;
  }

  delete req.query.page;
  delete req.query.limit;
  delete req.query.sort;

  let entities;

  entities = await Model.find(req.query || {})
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .populate(populates)
    .exec();

  const meta = {
    page,
    limit,
    count: await Model.find(req.query || {}).countDocuments(),
  };

  return {
    meta,
    data: entities,
  };
}

function jsonTransform(doc, transformFields) {
  const transformed = {};
  transformFields.forEach((field) => {
    transformed[field] = doc[field];
  });
  return transformed;
}

module.exports = {
  getPaginate,
  jsonTransform,
};
