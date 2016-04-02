var deleteNode, idGenerator, init, lpop, lpush, node, queue, render, rpop, rpush;

queue = {
  cachedMap: {},
  head: null,
  tail: null,
  lpop: function() {
    var nodeIdToDel, res;
    console.log("pop from head");
    if (this.head === null) {
      console.log("pop from head, but no node");
      return;
    } else {
      res = this.head;
      nodeIdToDel = this.head.id;
      if (this.head.next != null) {
        this.head.next.prev = null;
        this.head = this.head.next;
      } else {
        this.head = null;
        this.tail = null;
      }
      delete this.cachedMap[nodeIdToDel];
    }
    return res;
  },
  rpop: function() {
    var nodeIdToDel, res;
    console.log("pop from tail");
    if (this.tail === null) {
      console.log("pop from tail,but no node");
      return;
    } else {
      res = this.tail;
      nodeIdToDel = this.tail.id;
      if (this.tail.prev != null) {
        this.tail.prev.next = null;
        this.tail = this.tail.prev;
      } else {
        this.tail = null;
        this.head = null;
      }
      delete this.cachedMap[nodeIdToDel];
    }
    return res;
  },
  lpush: function(node) {
    console.log("push to head");
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    return this.cachedMap[node.id] = node;
  },
  rpush: function(node) {
    console.log("push to tail");
    if (this.tail === null) {
      this.tail = node;
      this.head = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    return this.cachedMap[node.id] = node;
  },
  deleteNode: function(id) {
    var curNode;
    console.log("delete node by Id: " + id);
    curNode = this.cachedMap[id];
    if (curNode.prev == null) {
      this.lpop(curNode);
    } else if (curNode.next == null) {
      this.rpop(curNode);
    } else {
      curNode.prev.next = curNode.next;
      curNode.next.prev = curNode.prev;
    }
    return delete this.cachedMap[curNode.id];
  }
};

node = function(id, val, prev, next) {
  this.id = id;
  this.val = val;
  this.prev = prev;
  return this.next = next;
};

idGenerator = function() {
  return (new Date()).valueOf();
};

lpush = function() {
  node = {
    val: document.getElementById('node_val').value,
    id: idGenerator()
  };
  queue.lpush(node);
  return render();
};

rpush = function() {
  node = {
    val: document.getElementById('node_val').value,
    id: idGenerator()
  };
  queue.rpush(node);
  return render();
};

lpop = function() {
  node = {
    val: document.getElementById('node_val').value,
    id: idGenerator()
  };
  queue.lpop();
  return render();
};

rpop = function() {
  node = {
    val: document.getElementById('node_val').value,
    id: idGenerator()
  };
  queue.rpop();
  return render();
};

deleteNode = function(node_id) {
  queue.deleteNode(node_id);
  return render();
};

render = function() {
  var curNode, disp, nodeStr;
  disp = document.getElementById('display');
  nodeStr = [];
  nodeStr.push('<ul>');
  curNode = queue.head;
  while (curNode != null) {
    nodeStr.push("<li class='node' data-id='" + curNode.id + "'>" + curNode.val + "</li>");
    curNode = curNode.next;
  }
  nodeStr.push('</ul>');
  return disp.innerHTML = nodeStr.join("");
};

init = function() {
  document.getElementById('l-push').addEventListener('click', lpush);
  document.getElementById('r-push').addEventListener('click', rpush);
  document.getElementById('l-pop').addEventListener('click', lpop);
  document.getElementById('r-pop').addEventListener('click', rpop);
  return document.getElementById('display').addEventListener('click', function(event) {
    if (event.target.nodeName.toLowerCase() === 'li') {
      return deleteNode(event.target.dataset.id);
    }
  }, false);
};

init();

//# sourceMappingURL=.maps/task18.js.map
