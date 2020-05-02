===========================================
header               id   header
header-logo          css  #header .logo
header-caption       css  #header h1

menu                 id   menu
menu-item-*          css  #menu li a

content              id   content
side-panel           id   side-panel
side-panel-caption   css  #side-panel h2
side-panel-links-*   css  #side-panel li a

comments             id   comments

footer               id   footer
==========================================


@ all
------------------------------------

header
    width: 100% of screen/width
    height: 100px
    above: menu 0px

menu
    width: 100% of screen/width
    below: header 0px
    above: content 0px


footer
    width: 100% of screen/width
    height: > 100px

content
    inside: screen 0px left
    below: menu 0px



@ desktop, tablet
-----------------------------------

side-panel
    width: 300px
    below: menu 0px
    inside: screen 0px right
    near: content 0px right

menu
    height: 50px

footer
    below: content 0px

@ mobile
-----------------------------------
side-panel
    width: 100% of screen/width
    below: content 5px

content
    width: 100% of screen/width
    above: side-panel 5px

footer
    below: side-panel 0px