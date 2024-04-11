// bookmark service
// import Api from "./Api";

// export default {
//   index(bookmark) {
//     return Api().get("bookmarks", {
//       params: bookmark,
//     });
//   },
//   post(bookmarkData) {
//     return Api().post("bookmarks", bookmarkData);
//   },
  
//   delete(bookmarkId) {
//     return Api().delete(`bookmarks/${bookmarkId}`); // Use 'Api().delete()' instead of 'Api().get()'
//   },
// };


// bookmarksService.js
import Api from "./Api";

export default {
  index(token) {
    return Api(token).get("bookmarks");
  },
  post(bookmarkData) {
    return Api().post("bookmarks", bookmarkData);
  },
  delete(bookmarkId) {
    return Api().delete(`bookmarks/${bookmarkId}`);
  },
};
