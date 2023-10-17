import Planes from "./plane.model.js"

export class PlaneServices{
    
    async createPlane(data){
        return await Planes.create(data)
    }

    async findOnePlane(id){
        return await Planes.findOne({
            where:{
                id,
                status: true
            }
        })
    }

    async findAllPlane(){
        return await Planes.findAll({
            status: true
        })
    }

    async updatePlane(plane, data){
        return await plane.update(data)
    }
    
    async deletePlane(plane){
        return await plane.update({
            status: false
        })
    }
}