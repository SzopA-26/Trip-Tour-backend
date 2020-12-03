const Province = require('../model/Province').model
const ProvinceSchema = require('../model/Province').schema

ProvinceSchema.methods.getAll = async () => {
   let provinces = await Province.find({})
   return provinces
}

ProvinceSchema.methods.getById = async (id) => {
   let province = await Province.findById(id)
   return province
}

ProvinceSchema.methods.getByName = async (name) => {
   let province = await Province.find({ name: name})
   return province
}

ProvinceSchema.methods.getByRegion = async (region) => {
   let province = await Province.find({ region: region})
   return province
}

ProvinceSchema.methods.create = async (params) => {
   let province = new Province({
      name: params.name,
      region: params.region
   })
   console.log(province)
   await province.save()
}

module.exports = ProvinceSchema.methods