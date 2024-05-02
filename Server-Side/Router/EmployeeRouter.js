const express = require('express');
const validate = require('../Middleware/Validate-Middleware');
const EmployeevalidationSchena = require('../Validation/EmployeeValidation');
const router = express.Router();
const {AddEmployee, Getemployeedata, UpdateEmpData, AllEmpData, DeleteEmployeeData, searchEmployee, AllEmployeeData}  = require('../Controller/EmployeeController')

router.route('/addEmployee').post(AddEmployee);
router.route('/getSingleEmployee/:id').get(Getemployeedata);
router.route('/updateEmployeeData/:id').put(UpdateEmpData);
router.route('/AllEmployeeData').get(AllEmpData);
router.route('/deleteEmployee/:id').delete(DeleteEmployeeData);
router.route('/search/:key').get(searchEmployee);
router.route('/allUserdata/withoutPagination').get(AllEmployeeData);

module.exports = router;