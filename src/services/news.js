import {orderBy} from "lodash";
import {_api_key,language,category,articles_url} from '../config/rest_config';

export async function getArticles() {
  try{
    let articles = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=6eeeb11e1b6a4e40bb4477f12b35d003');
    let result = await articles.json();
    return result.articles;
  } catch(error) {
      throw error;
  }
}