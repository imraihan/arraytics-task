const Item = require("../models/item");

const fetchItems = async(req, res) => {
    const items = await Item.find();
    res.json({items});
  };


const fetchItem = async(req, res)=> {
    const itemId = req.params.id;
  
    const item = await Item.findById(itemId)
  
    res.json({item})
  }

const createItem = async (req, res) => {
    const {name} = req.body;
  
    const item = await Item.create({
        name
      });
    res.json({ item: item});
  };

  const updateItem = async(req, res)=> {
    const itemId = req.params.id;
    const {name} = req.body;
  
    await Item.findByIdAndUpdate(itemId, {
      name,
    });
    const item = await Item.findById(itemId);

    res.json({item});
  };

  const deleteItem = async(req, res)=> {
    const itemId = req.params.id;
  
    await Item.deleteOne({_id: itemId});
  
    res.json({success: "Record Deleted"});
  };

  module.exports = {
    fetchItems,
    fetchItem,
    createItem,
    updateItem,
    deleteItem,
  }