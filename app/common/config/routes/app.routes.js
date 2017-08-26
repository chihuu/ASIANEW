"use strict";

const routes = [
  {
    id: 1,
    refView: "HomeView",
    sidemenu: {
      sideMenuButtonText: "Home",
      iconName: require("../../images/menu/icon_home_192_w.png"),
      iconSize: { width: 20, height: 18 },
      hasChild: false
    },
    navbar: {
      navBarTitle: "SBTN",
      navBarLeftIconName: "ios-menu",
      navBarLeftIconSize: 32,
      navBarRightIconName: "ios-search",
      navBarRightIconSize: 32,
      isChromecast: true,
      isSearchIcon: true
    }
  },
  {
    id: 2,
    refView: "Package",
    sidemenu: {
      // sideMenuButtonText  : 'Package',
      // iconName            : require('../../images/menu/icon_package_192.png'),
      // iconSize            : {width: 26, height: 24},
      // hasChild            : false
    },
    navbar: {
      navBarTitle: "SBTN",
      navBarLeftIconName: "ios-menu",
      navBarLeftIconSize: 32,
      navBarRightIconName: "ios-search",
      navBarRightIconSize: 32,
      isChromecast: true,
      isSearchIcon: true
    }
  },
  {
    id: 3,
    refView: "Category",
    sidemenu: {},
    navbar: {
      navBarTitle: "SBTN",
      navBarLeftIconName: "ios-menu",
      navBarLeftIconSize: 32,
      navBarRightIconName: "ios-search",
      navBarRightIconSize: 32,
      isChromecast: true,
      isSearchIcon: true
    }
  },
  {
    id: 4,
    refView: "Search",
    sidemenu: {},
    navbar: {
      type: "back",
      navBarTitle: "SBTN",
      navBarLeftIconName: "ios-arrow-back",
      navBarLeftIconSize: 32,
      isChromecast: true
    }
  },
  {
    id: 5,
    refView: "Detail",
    sidemenu: {},
    navbar: {
      type: "back",
      navBarTitle: "SBTN",
      navBarLeftIconName: "ios-arrow-back",
      navBarLeftIconSize: 32,
      isChromecast: true,
      isSearchIcon: false
    }
  },
  {
    id: 6,
    refView: "Login",
    sidemenu: {},
    navbar: {
      navBarTitle: "SBTN",
      navBarLeftIconName: "ios-menu",
      navBarLeftIconSize: 32,
      navBarRightIconName: "ios-search",
      navBarRightIconSize: 32,
      isChromecast: true,
      isSearchIcon: true
    }
  },
  {
    id: 7,
    refView: "LoginFB",
    sidemenu: {},
    navbar: {
      navBarTitle: "SBTN",
      navBarLeftIconName: "ios-menu",
      navBarLeftIconSize: 32,
      navBarRightIconName: "ios-search",
      navBarRightIconSize: 32,
      isChromecast: true,
      isSearchIcon: true
    }
  },
  {
    id: 8,
    refView: "Register",
    sidemenu: {},
    navbar: {
      type: "back",
      navBarTitle: "SBTN",
      navBarLeftIconName: "ios-arrow-back",
      navBarLeftIconSize: 32,
      isChromecast: true,
      isSearchIcon: false
    }
  },
  {
    id: 9,
    refView: "More",
    sidemenu: {},
    navbar: {
      type: "back",
      navBarTitle: "SBTN",
      navBarLeftIconName: "ios-arrow-back",
      navBarLeftIconSize: 32,
      navBarRightIconName: "ios-search",
      navBarRightIconSize: 32,
      isChromecast: true,
      isSearchIcon: true
    }
  },
  {
    id: 10,
    refView: "PackageDetail",
    sidemenu: {},
    navbar: {
      type: "back",
      navBarTitle: "SBTN",
      navBarLeftIconName: "ios-arrow-back",
      navBarLeftIconSize: 32,
      navBarRightIconName: "ios-search",
      navBarRightIconSize: 32,
      isChromecast: true,
      isSearchIcon: true
    }
  },
  {
    id: 11,
    refView: "Playlist",
    sidemenu: {},
    navbar: {
      type: "back",
      navBarTitle: "SBTN",
      navBarLeftIconName: "ios-arrow-back",
      navBarLeftIconSize: 32,
      navBarRightIconName: "ios-search",
      navBarRightIconSize: 32,
      isChromecast: true,
      isSearchIcon: true
    }
  },
  {
    id: 12,
    refView: "ContentPlaylist",
    sidemenu: {},
    navbar: {
      type: "back",
      navBarTitle: "SBTN",
      navBarLeftIconName: "ios-arrow-back",
      navBarLeftIconSize: 32,
      navBarRightIconName: "ios-search",
      navBarRightIconSize: 32,
      isChromecast: true,
      isSearchIcon: true
    }
  },
  {
    id: 13,
    refView: "Daily Schedule",
    sidemenu: {
      sideMenuButtonText: "Daily Schedule",
      iconName: require("../../images/menu/icon_package_192.png"),
      iconSize: { width: 26, height: 24 },
      hasChild: false
    },
    navbar: {
      navBarTitle: "SBTN",
      navBarLeftIconName: "ios-menu",
      navBarLeftIconSize: 32,
      navBarRightIconName: "ios-search",
      navBarRightIconSize: 32,
      isChromecast: true,
      isSearchIcon: true
    }
  }
];

class AppRoutesClass {
  getRouteFromRouteId(routeId) {
    console.log(123);
    return routes.find(route => route.refView === routeId);
  }

  getAllRoutes() {
    return [...routes];
  }
}

const AppRoutes = new AppRoutesClass();

export default AppRoutes;
