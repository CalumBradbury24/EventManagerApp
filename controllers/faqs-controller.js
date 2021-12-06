const AppError = require('../utils.js/app-error');
const connection = require('../utils.js/sql-config');
const { catchAsyncErrors } = require('../utils.js/utilities');


const getGeneralFAQs = catchAsyncErrors(async(req, res, next) => {
    connection.query(`select FaqID, faqQuestion, faqAnswer from FAQs where displayFAQ = 1 and deprecated = 0`, (err, rows) => {
        if(err){
            return next(new AppError('Error fetching general FAQs', 400));
        }
        res.status(200).json({status: 'success', data: rows || []});
    });
}, 'getCommonFAQs')

const getFAQsSearch = catchAsyncErrors(async(req, res, next) => {
    const search = '' +  req.params.search;
    console.log(search);
    connection.query(`select FaqID, faqQuestion, faqAnswer from FAQs where deprecated = 0 and faqQuestion like '%${search}%'`, (err, rows) => {
        if(err){
            return next(new AppError('Error searching FAQs', 400));
        }
        res.status(200).json({status: 'success', data: rows || []});
    });
}, 'getFAQsSearch')

module.exports = {
    getGeneralFAQs,
    getFAQsSearch
}