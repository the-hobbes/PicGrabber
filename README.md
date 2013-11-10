PicGrabber
==========

Chrome Extension to bulk-download images.
-----------------------------------------

#### Purpose:
It can be annoying to have to "right click->save image" as" on many files. To that end, this is an extension which will enable you to download multiple images at once from a webpage by simply clicking the appropriate extension button in the chrome browser. The extension is hooked into your dropbox account, and will save the images to a folder in that account.

#### How it works:
When the extension button is clicked, the current page's html is scraped for its image tags. The url's corresponding to these tags are retrieved, and then run through code that determines their size. If their size is sufficiently large (IE not a thumbnail), the images are saved to the downloads folder.

Enhancements for the future
---------------------------
- be able to following thumbnail links to retrieve the larger pictures they are masking & linking.

Developers
----------
- [Phelan Vendeville]

License:
----------
[GNU Public License]

[GNU Public License]: http://www.gnu.org/licenses/gpl.html
[Phelan Vendeville]: https://github.com/the-hobbes