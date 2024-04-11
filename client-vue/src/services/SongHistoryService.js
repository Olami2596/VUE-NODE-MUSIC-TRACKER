import Api from "./Api";

export default {
  index(history) {
    return Api().get("histories", {
      params: history,
    });
  },
  post(history) {
    return Api().post("histories", history);
  },

};
