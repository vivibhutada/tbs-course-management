
const getAll = ({ dao, db}) => async (req, res) => {
  try {
    const result = await dao.getAll({ db })();
    res.status(200).send({statusCode: 200, message: "countries list",data:result});
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
};

const getById = ({ dao, db}) => async (req, res) => {
  try {
    const id=req.params.id
    const result = await dao.getById({ db })(id);
    res.status(200).send({statusCode: 200, message: "",data:result});
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
};

const save = ({ dao, db,validation}) => async (req, res) => {
  
  try {
      let body=req.body;
     
      // validation check
      const { error } = validation.schema.validate(body);
      if (error) {
        return res.status(400).json({
          statusCode: 400,
          errors: error.details.map((err) => err.message),
        });
      }
      body.userid=req.user.userid;
      let result = await dao.save({ db ,validation})(body,req);
      if(result.status){
        res.status(200).send({statusCode: 200, message: result.message});
      }else{ 
        res.status(500).json({ statusCode: 500, errors: result.errors });
      }
  } catch (error) {
    
    console.error("Error on save data:", error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
};

const deleteById = ({ dao, db}) => async (req, res) => {
  try {
    const id=req.body.id
    const result = await dao.deleteById({ db })(id);
    res.status(200).send({statusCode: 200, message: "Country Deleted Successfully"});
  } catch (error) {
    console.error("Error Deleting data:", error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
};
 
module.exports = {
  getAll,
  getById,
  save,
  deleteById
}

