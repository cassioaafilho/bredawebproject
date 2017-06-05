// Definition of the images collection
const imageStore = new FS.Store.GridFS('images');
const ImagesCollection = new FS.Collection('images', {
    stores: [imageStore]
});
ImagesCollection.allow({
    download: function () {
        return true;
    }
});

export { ImagesCollection }