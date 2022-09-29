(function() {
    // no jQuery, just for "fun". It was no fun at all.
    var addListItem, animationEndEvent, i, input, item, itemClickHandler, len, prefix, ref, removeListItem;
  
    prefix = (function() {
      var dom, pre, styles;
      styles = window.getComputedStyle(document.documentElement, "");
      pre = (Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/) || (styles.OLink === "" && ["", "o"]))[1];
      dom = "WebKit|Moz|MS|O".match(new RegExp("(" + pre + ")", "i"))[1];
      return {
        dom: dom,
        lowercase: pre,
        css: "-" + pre + "-",
        js: pre[0].toUpperCase() + pre.substr(1)
      };
    })();
  
    animationEndEvent = prefix.lowercase + "AnimationEnd";
  
    if (prefix.lowercase === "moz") {
      animationEndEvent = "animationend";
    }
  
    console.log(animationEndEvent);
  
    window.insertAnimation = function(text, list) {
      var closeIcon, firstItem, i, item, items, len, newItem, ref;
      items = list.querySelectorAll(".list__item");
      ref = list.querySelectorAll(".list__item");
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        item.classList.add("list__item--inserting");
        item.addEventListener(animationEndEvent, function(event) {
          return event.target.classList.remove("list__item--inserting");
        });
      }
      newItem = document.createElement("li");
      newItem.classList.add("list__item");
      newItem.classList.add("list__item--inserting-new");
      newItem.innerHTML = text;
      closeIcon = document.createElement("i");
      closeIcon.classList.add("icon-close");
      newItem.appendChild(closeIcon);
      closeIcon.addEventListener("click", itemClickHandler);
      firstItem = items[0];
      list.insertBefore(newItem, firstItem);
      return newItem.addEventListener(animationEndEvent, function(event) {
        return event.target.classList.remove("list__item--inserting-new");
      });
    };
  
    window.removeAnimation = function(index, list) {
      var handler, i, item, items, len, postCount, postItem, postItems;
      items = list.querySelectorAll(".list__item");
      item = items.item(index);
      item.classList.add("list__item--inserting-removed");
      postItems = document.querySelectorAll(`.list__item:nth-child(1n+${index + 2})`);
      postCount = 0;
      handler = function(event) {
        var i, len, removeItem, results;
        event.target.removeEventListener(animationEndEvent, arguments.callee);
        postCount++;
        if (postCount === postItems.length || postCount > 5) {
          list.removeChild(item);
          results = [];
          for (i = 0, len = postItems.length; i < len; i++) {
            removeItem = postItems[i];
            results.push(removeItem.classList.remove("list__item--removing-sibling"));
          }
          return results;
        }
      };
      for (i = 0, len = postItems.length; i < len; i++) {
        postItem = postItems[i];
        postItem.classList.add("list__item--removing-sibling");
        postItem.addEventListener(animationEndEvent, handler);
      }
      if (postItems.length === 0) {
        return item.addEventListener(animationEndEvent, function() {
          return list.removeChild(item);
        });
      }
    };
  
    addListItem = function() {
      var input, list, todoText;
      input = document.querySelectorAll(".list-input").item(0);
      list = document.querySelectorAll(".list").item(0);
      todoText = input.value;
      input.value = "";
      if (todoText !== "") {
        return insertAnimation(todoText, list);
      }
    };
  
    removeListItem = function(index) {
      var list;
      list = document.querySelectorAll(".list").item(0);
      return removeAnimation(index, list);
    };
  
    input = document.querySelectorAll(".list-input")[0];
  
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        return addListItem();
      }
    });
  
    itemClickHandler = function(event) {
      var index, itemsArray, itemsNodeList, listItem;
      listItem = event.target.parentNode;
      event.target.removeEventListener("click", arguments.callee);
      itemsNodeList = document.querySelectorAll(".list .list__item");
      itemsArray = Array.prototype.slice.call(itemsNodeList);
      index = itemsArray.indexOf(listItem);
      return removeListItem(index);
    };
  
    ref = document.querySelectorAll(".list .list__item .icon-close");
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      item.addEventListener("click", itemClickHandler);
    }
  
    input.style.marginBottom = String(input.offsetHeight) + "px";
  
    setTimeout(function() {
      return addListItem();
    }, 1000);
  
  }).call(this);
  
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQWtEO0VBQUE7QUFBQSxNQUFBLFdBQUEsRUFBQSxpQkFBQSxFQUFBLENBQUEsRUFBQSxLQUFBLEVBQUEsSUFBQSxFQUFBLGdCQUFBLEVBQUEsR0FBQSxFQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUE7O0VBRWxELE1BQUEsR0FBUyxDQUFDLFFBQUEsQ0FBQSxDQUFBO0FBQ1YsUUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBO0lBQUUsTUFBQSxHQUFTLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixRQUFRLENBQUMsZUFBakMsRUFBa0QsRUFBbEQ7SUFDVCxHQUFBLEdBQU0sQ0FBQyxLQUFLLENBQUEsU0FBRSxDQUFBLEtBQUssQ0FBQyxJQUFiLENBQWtCLE1BQWxCLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsRUFBL0IsQ0FBa0MsQ0FBQyxLQUFuQyxDQUF5QyxtQkFBekMsQ0FBQSxJQUFpRSxDQUFDLE1BQU0sQ0FBQyxLQUFQLEtBQWdCLEVBQWhCLElBQXVCLENBQzlGLEVBRDhGLEVBRTlGLEdBRjhGLENBQXhCLENBQWxFLENBR0gsQ0FBQyxDQUFEO0lBQ0gsR0FBQSxHQUFPLGlCQUFrQixDQUFDLEtBQXBCLENBQTBCLElBQUksTUFBSixDQUFXLEdBQUEsR0FBTSxHQUFOLEdBQVksR0FBdkIsRUFBNEIsR0FBNUIsQ0FBMUIsQ0FBMkQsQ0FBQyxDQUFEO1dBQ2pFO01BQUEsR0FBQSxFQUFLLEdBQUw7TUFDQSxTQUFBLEVBQVcsR0FEWDtNQUVBLEdBQUEsRUFBSyxHQUFBLEdBQU0sR0FBTixHQUFZLEdBRmpCO01BR0EsRUFBQSxFQUFJLEdBQUcsQ0FBQyxDQUFELENBQUcsQ0FBQyxXQUFQLENBQUEsQ0FBQSxHQUF1QixHQUFHLENBQUMsTUFBSixDQUFXLENBQVg7SUFIM0I7RUFQUSxDQUFELENBQUEsQ0FBQTs7RUFhVCxpQkFBQSxHQUFvQixNQUFNLENBQUMs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UUFBQSxLQUFBLEVBQUEsVUFBQSxFQUFBLGFBQUEsRUFBQTtJQUFFLFFBQUEsR0FBVyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ3hCLEtBQUssQ0FBQyxNQUFNLENBQUMsbUJBQWIsQ0FBaUMsT0FBakMsRUFBMEMsU0FBUyxDQUFDLE1BQXBEO0lBQ0EsYUFBQSxHQUFnQixRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsbUJBQTFCO0lBQ2hCLFVBQUEsR0FBYSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUF0QixDQUEyQixhQUEzQjtJQUNiLEtBQUEsR0FBUSxVQUFVLENBQUMsT0FBWCxDQUFtQixRQUFuQjtXQUNSLGNBQUEsQ0FBZSxLQUFmO0VBTmlCOztBQVFuQjtFQUFBLEtBQUEscUNBQUE7O0lBQ0UsSUFBSSxDQUFDLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLGdCQUEvQjtFQURGOztFQUdBLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWixHQUEyQixNQUFBLENBQU8sS0FBSyxDQUFDLFlBQWIsQ0FBQSxHQUEyQjs7RUFFdEQsVUFBQSxDQUFXLFFBQUEsQ0FBQSxDQUFBO1dBQ1QsV0FBQSxDQUFBO0VBRFMsQ0FBWCxFQUVFLElBRkY7QUFwR2tEIiwic291cmNlc0NvbnRlbnQiOlsiIyBubyBqUXVlcnksIGp1c3QgZm9yIFwiZnVuXCIuIEl0IHdhcyBubyBmdW4gYXQgYWxsLlxuXG5wcmVmaXggPSAoLT5cbiAgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBcIlwiKVxuICBwcmUgPSAoQXJyYXk6OnNsaWNlLmNhbGwoc3R5bGVzKS5qb2luKFwiXCIpLm1hdGNoKC8tKG1venx3ZWJraXR8bXMpLS8pIG9yIChzdHlsZXMuT0xpbmsgaXMgXCJcIiBhbmQgW1xuICAgIFwiXCJcbiAgICBcIm9cIlxuICBdKSlbMV1cbiAgZG9tID0gKFwiV2ViS2l0fE1venxNU3xPXCIpLm1hdGNoKG5ldyBSZWdFeHAoXCIoXCIgKyBwcmUgKyBcIilcIiwgXCJpXCIpKVsxXVxuICBkb206IGRvbVxuICBsb3dlcmNhc2U6IHByZVxuICBjc3M6IFwiLVwiICsgcHJlICsgXCItXCJcbiAganM6IHByZVswXS50b1VwcGVyQ2FzZSgpICsgcHJlLnN1YnN0cigxKVxuKSgpXG5cbmFuaW1hdGlvbkVuZEV2ZW50ID0gcHJlZml4Lmxvd2VyY2FzZStcIkFuaW1hdGlvbkVuZFwiXG5hbmltYXRpb25FbmRFdmVudCA9IFwiYW5pbWF0aW9uZW5kXCIgaWYgcHJlZml4Lmxvd2VyY2FzZSBpcyBcIm1velwiXG5jb25zb2xlLmxvZyBhbmltYXRpb25FbmRFdmVudFxuXG53aW5kb3cuaW5zZXJ0QW5pbWF0aW9uID0gKHRleHQsIGxpc3QpLT5cbiAgaXRlbXMgPSBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGlzdF9faXRlbVwiKVxuIFxuICBmb3IgaXRlbSBpbiBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGlzdF9faXRlbVwiKVxuICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImxpc3RfX2l0ZW0tLWluc2VydGluZ1wiKVxuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lciBhbmltYXRpb25FbmRFdmVudCwgKGV2ZW50KS0+XG4gICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImxpc3RfX2l0ZW0tLWluc2VydGluZ1wiKVxuICBcbiAgXG4gIG5ld0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcbiAgbmV3SXRlbS5jbGFzc0xpc3QuYWRkIFwibGlzdF9faXRlbVwiIFxuICBuZXdJdGVtLmNsYXNzTGlzdC5hZGQgXCJsaXN0X19pdGVtLS1pbnNlcnRpbmctbmV3XCJcbiAgbmV3SXRlbS5pbm5lckhUTUwgPSB0ZXh0XG4gIGNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpXG4gIGNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkIFwiaWNvbi1jbG9zZVwiXG4gIG5ld0l0ZW0uYXBwZW5kQ2hpbGQgY2xvc2VJY29uXG4gIGNsb3NlSWNvbi5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgaXRlbUNsaWNrSGFuZGxlciAgXG5cbiAgZmlyc3RJdGVtID0gaXRlbXNbMF1cbiAgbGlzdC5pbnNlcnRCZWZvcmUobmV3SXRlbSwgZmlyc3RJdGVtKVxuICBuZXdJdGVtLmFkZEV2ZW50TGlzdGVuZXIgYW5pbWF0aW9uRW5kRXZlbnQsIChldmVudCktPlxuICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJsaXN0X19pdGVtLS1pbnNlcnRpbmctbmV3XCIpXG4gICAgXG53aW5kb3cucmVtb3ZlQW5pbWF0aW9uID0gKGluZGV4LCBsaXN0KS0+XG4gIGl0ZW1zID0gbGlzdC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxpc3RfX2l0ZW1cIilcbiAgaXRlbSA9IGl0ZW1zLml0ZW0oaW5kZXgpICBcbiAgaXRlbS5jbGFzc0xpc3QuYWRkKFwibGlzdF9faXRlbS0taW5zZXJ0aW5nLXJlbW92ZWRcIilcbiAgcG9zdEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5saXN0X19pdGVtOm50aC1jaGlsZCgxbisjeyhpbmRleCsyKX0pXCIpXG5cbiAgcG9zdENvdW50ID0gMFxuICBoYW5kbGVyID0gKGV2ZW50KS0+XG4gICAgZXZlbnQudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIgYW5pbWF0aW9uRW5kRXZlbnQsIGFyZ3VtZW50cy5jYWxsZWVcbiAgICBwb3N0Q291bnQrK1xuICAgIGlmIHBvc3RDb3VudCBpcyBwb3N0SXRlbXMubGVuZ3RoIG9yIHBvc3RDb3VudCA+IDVcbiAgICAgIGxpc3QucmVtb3ZlQ2hpbGQoaXRlbSlcbiAgICAgIGZvciByZW1vdmVJdGVtIGluIHBvc3RJdGVtc1xuICAgICAgICByZW1vdmVJdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJsaXN0X19pdGVtLS1yZW1vdmluZy1zaWJsaW5nXCIpXG4gICAgICAgIFxuICAgICAgICBcbiAgXG4gIGZvciBwb3N0SXRlbSBpbiBwb3N0SXRlbXNcbiAgICBwb3N0SXRlbS5jbGFzc0xpc3QuYWRkKFwibGlzdF9faXRlbS0tcmVtb3Zpbmctc2libGluZ1wiKVxuICAgIHBvc3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIgYW5pbWF0aW9uRW5kRXZlbnQsIGhhbmRsZXJcbiAgICBcbiAgaWYgcG9zdEl0ZW1zLmxlbmd0aCBpcyAwXG4gICAgaXRlbS5hZGRFdmVudExpc3RlbmVyIGFuaW1hdGlvbkVuZEV2ZW50LCAtPiBsaXN0LnJlbW92ZUNoaWxkKGl0ZW0pXG4gICAgXG4gICAgICBcbmFkZExpc3RJdGVtID0gLT5cbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxpc3QtaW5wdXRcIikuaXRlbSgwKVxuICBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5saXN0XCIpLml0ZW0oMClcbiAgXG4gIHRvZG9UZXh0ID0gaW5wdXQudmFsdWVcbiAgaW5wdXQudmFsdWUgPSBcIlwiXG4gIGlmIHRvZG9UZXh0IGlzbnQgXCJcIlxuICAgIGluc2VydEFuaW1hdGlvbih0b2RvVGV4dCwgbGlzdClcblxuICAgIFxucmVtb3ZlTGlzdEl0ZW0gPSAoaW5kZXgpLT5cbiAgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGlzdFwiKS5pdGVtKDApXG4gIHJlbW92ZUFuaW1hdGlvbihpbmRleCwgbGlzdClcbiAgXG5pbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGlzdC1pbnB1dFwiKVswXVxuXG5pbnB1dC5hZGRFdmVudExpc3RlbmVyIFwia2V5dXBcIiwgKGV2ZW50KS0+XG4gIGlmIGV2ZW50LmtleUNvZGUgaXMgMTNcbiAgICBhZGRMaXN0SXRlbSgpXG5cbml0ZW1DbGlja0hhbmRsZXIgPSAoZXZlbnQpLT5cbiAgbGlzdEl0ZW0gPSBldmVudC50YXJnZXQucGFyZW50Tm9kZVxuICBldmVudC50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIGFyZ3VtZW50cy5jYWxsZWVcbiAgaXRlbXNOb2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGlzdCAubGlzdF9faXRlbVwiKVxuICBpdGVtc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoaXRlbXNOb2RlTGlzdClcbiAgaW5kZXggPSBpdGVtc0FycmF5LmluZGV4T2YobGlzdEl0ZW0pXG4gIHJlbW92ZUxpc3RJdGVtKGluZGV4KVxuICBcbmZvciBpdGVtIGluIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGlzdCAubGlzdF9faXRlbSAuaWNvbi1jbG9zZVwiKVxuICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCBpdGVtQ2xpY2tIYW5kbGVyXG4gIFxuaW5wdXQuc3R5bGUubWFyZ2luQm90dG9tID0gU3RyaW5nKGlucHV0Lm9mZnNldEhlaWdodCkrXCJweFwiXG5cbnNldFRpbWVvdXQgLT5cbiAgYWRkTGlzdEl0ZW0oKVxuLCAxMDAwXG5cblxuXG4iXX0=
  //# sourceURL=coffeescript