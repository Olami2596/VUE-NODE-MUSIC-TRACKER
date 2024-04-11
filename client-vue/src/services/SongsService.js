import Api from "./Api";

export default {
  index(search) {
    return Api().get("songs", {
      params: {
        search: search
      }
    });
  },
  show(id) {
    return Api().get(`songs/${id}`);
  },
  post(song) {
    return Api().post("songs", song);
  },
  put(song) {
    return Api().put(`songs/${song._id}`, song);
  },
};
