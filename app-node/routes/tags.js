var Tag = require('../models/tag.js');

var tagsApi = {
  getAll: (req, res) => {
    return Tag.find(function (err, tags) {
      if (!err) {
        return res.send({ 'data': tags });
      } else {
        return res.send(500, err);
      }
    });
  },
  getById: (req, res) => {
    return Tag.findOne({ '_id': req.params.id }, function (err, tag) {
      if (!err) {
        return res.json({ 'data': tag });
      } else {
        return res.send(500, err);
      }
    });
  },
  newTag: (req, res) => {
    var tag = new Tag({
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description,
      date: new Date(Date.now())
    });

    tag.save(function (err) {
      if (!err) {
        res.status(200);
        res.json(tag);

      } else {
        res.status(500);
        res.json(err);
      }
    });
  },
  editTag: (req, res) => {
    var id = req.params.id;
    Tag.update({
      _id: id
    }, {
      $set: {
        name: req.body.name || '',
        slug: req.body.slug || '',
        description: req.body.description || '',
        date: new Date(Date.now())
      }}).exec();
    res.status(200);
    return res.send({});
  },
  deleteTag: (req, res) => {
    var id = req.params.id;
    Tag.remove({
      _id: id
    }, function (err) {
      return err;
    });
    res.status(200);
    return res.send();
  }
};

module.exports = tagsApi;