
import React, {Component} from 'react';
import Authorization from '../common/Authorization';

class SideMenuClass {

   async getMoviesFromApi() {
      try {
        const authorization = Authorization.generate();

        let response = await fetch('http://ottapi.com/v1.7/ntm/home/menu', {
                                          method: 'GET',
                                          headers: {
                                            'DateTime': authorization.DateTime,
                                            'RequestToken': authorization.RequestToken
                                          }
                                    });
        let responseJson = await response.json();
        return responseJson;
      } catch(error) {
        console.error(error);
      }
    }
}

const SideMenu = new SideMenuClass();

export default SideMenu;
