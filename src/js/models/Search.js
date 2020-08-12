import { axios } from "../vendor";
import { APISearch } from "../config";

export class Search {
   constructor(query) {
      this.query = query;
   }

   async getResults() {
      try {
         const res = await axios(`${APISearch}${this.query}`);
         this.result = res.data.recipes;
      } catch (err) {
         alert(err);
      }
   }
}
