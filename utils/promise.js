
const Cat = require("../models/catagorySchema")
const SubCat = require("../models/subcatagorySchema")

let getCategory = async (id) => {

    let data = await Cat.find({ owner: id }).lean()

    let mypromise = new Promise(function(resolve, reject) {

        let cat = [];

        data.map(async (item) => {

            try {
                let catagory = await SubCat.find({
                    parentCatagory: item._id
                });

                console.log(catagory);

                cat.push({
                    ...item,
                    subcatagory: catagory
                });

                if (data.length == cat.length) {
                    resolve(cat);
                }

            } catch (error) {
                reject(error);
            }
        });
    });

    return mypromise;
};

module.exports = getCategory;