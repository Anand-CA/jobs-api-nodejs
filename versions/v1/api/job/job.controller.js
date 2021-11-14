const jobdata = require("../../data/jobdata.json");

module.exports.getalljobs = async (req, res) => {
  const term = req.query.term;
  const page = req.query.page || 1;
  const limit = 12;
  let jobs;
  let filteredData;
  console.log({ term });
  try {
    if (!term) {
      jobs = await paginationonjsonarray(
        jobdata.jobs.job,
        parseInt(page),
        parseInt(limit)
      );
    } else {
      filteredData = returnAllJobswithkeyandvalue(
        jobdata.jobs.job,
        "description",
        term
      );
      jobs = await paginationonjsonarray(
        filteredData,
        parseInt(page),
        parseInt(limit)
      );
    }

    console.log(jobs.length);

    res.status(200).json({
      sucess: true,
      per_page: jobs.length,
      result: jobs,
      current_page: page,
      total_count: term ? filteredData.length : jobdata.jobs.job.length,
      total_pages: term
        ? Math.ceil(filteredData.length / limit)
        : Math.ceil(jobdata.jobs.job.length / limit),
    });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await jobdata.jobs.job.find((job) => job.id.__cdata === id);
    res.status(200).json({
      sucess: true,
      count: 1,
      result: job,
    });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};

function paginationonjsonarray(array, page, limit) {
  const offset = (page - 1) * limit;
  return array.slice(offset, offset + limit);
}

function returnAllJobswithkeyandvalue(json, key, value) {
  var result = [];
  for (var i = 0; i < json.length; i++) {
    if (json[i][key].__cdata.toLowerCase().includes(value.toLowerCase())) {
      result.push(json[i]);
    }
  }
  return result;
}
