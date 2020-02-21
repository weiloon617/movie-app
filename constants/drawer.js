const drawerStyles = {
  drawer: { shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 3 }
};

/**
 * Filter Property Drawer
 * @type {{openDrawerOffset: number, side: string, tweenHandler: (function(*): {main: {opacity: number}}), closedDrawerOffset: number, styles: {drawer: {shadowRadius: number, shadowOpacity: number, shadowColor: string}, main: {paddingLeft: number}}, tapToClose: boolean, type: string, panCloseMask: number}}
 */
export const filterDrawerConfig = {
  type: "overlay",
  tapToClose: true, // tap to close the drawer
  openDrawerOffset: 0.2, // 20% gap on the left side of drawer
  panCloseMask: 0.2,
  closedDrawerOffset: -3,
  tweenHandler: ratio => ({
    main: { opacity: (2 - ratio) / 2 }
  }),
  side: "right", // attach on right side,
  styles: drawerStyles
};
