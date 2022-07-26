const Category = require('../../Models/Category');
const { verifyToken } = require('../../utils/verifyToken');

const router=require('express').Router();

//get categories
router.get('/',async(req,res,next)=>{
    try {
        let name=req.query.name||"";
        let page=req.query.page -1 ||0;
        let limit=req.query.limit||5;
        let skip=page*limit;
       const category=await Category.find({name:{$regex:name,$options:'i'}})
       .limit(limit)
       .skip(skip)
        res.status(200).json({
            error:false,
            message:'categories fetched',
            data:category
            })

    } catch (error) {
        next(error)    
    }
});

//post categories
router.post('/',async(req,res,next)=>{
    try {
        const cat=await Category.findOne({title:req.body.title}).populate('Category');    
        if(cat){
            return res.status(400).json({
                error:true,
                message:"category already exists"
            })
        }
        const category=await new Category(req.body)
        const newCategory=await category.save();
        if(!newCategory){
            return res.status(400).json({
                error:true,
                message:"category not created"
            })
        }
        
        res.status(200).json({
            error:false,
            message:'category created',
            data:newCategory
            })

    } catch (error) {
        next(error)    
    }
})
//delete categories
router.delete('/:id',async(req,res,next)=>{
    const categoryId=req.params.id;
    try {
        const category=await Category.findOne({_id:categoryId});
        if(!category){
            return res.status(400).json({
                error:true,
                message:"category not found"
            })
        }
        await Category.findOneAndDelete({_id:categoryId});
        res.status(200).json({
            error:false,
            message:'category deleted'
            })
        }
catch (error) {
    next(error)
}

})
//put categories
router.put('/:id',async(req,res,next)=>{
    const categoryId=req.params.id;
    try {
        const category=await Category.findOne({_id:categoryId});
        if(!category){
            return res.status(400).json({
                error:true,
                message:"category not found"
            })
        }
        const name=req.body.name;
        const price=req.body.price;
        const relesedDate=req.body.releasedDate;
        await Category.updateOne({_id:categoryId},{
           $set:{
            title:name,
            price:price,
            relesedDate:relesedDate
        }
        },{new:true});
        res.status(200).json({
            error:false,
            message:'category updated',
            data:category
            })
        }
catch (error) {
    next(error)
}

})
module.exports=router;