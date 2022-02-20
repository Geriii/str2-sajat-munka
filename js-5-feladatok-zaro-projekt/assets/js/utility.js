

let createAnyElement = (name, attributes) => {
  let element = document.createElement(name);
  for (let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
  return element;
};

function validateForm(element) {
  let inputs = element.querySelectorAll("input");

  let regexpTest = (regExp, input) => {
    if (regExp.test(input.value)) {
      return true;
    } else {
      let divElement = createAnyElement("div", { class: "error" });
      divElement.innerHTML = "Hiba a validáláskor: " + input.name;
      let body = document.getElementsByTagName("body")[0];
      body.insertBefore(divElement, body.firstChild);

      input.classList.add("error");
      setTimeout(() => {
        divElement.remove();
        input.classList.remove("error");
      }, 10000);
      return false;
    }
  };

  let regExp;
  let name, emailAddress, address;
  for (let i = 0; i < inputs.length; i++) {
    switch (inputs[i].name) {
      case "name":
        regExp = /^[a-z ,.'-]+$/i;
        name = regexpTest(regExp, inputs[i]);
        break;
      case "email":
        regExp =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        emailAddress = regexpTest(regExp, inputs[i]);
        break;
      case "street":
        regExp = /^[a-zA-Z]{0,10}$/;
        address = regexpTest(regExp, inputs[i]);
        break;
      
    }
  }
  return name && emailAddress && address ;
}

let getRowData = (element) => {
  let inputs = element.querySelectorAll("input");
  let data = {};

  for (let i = 0; i < inputs.length; i++) {
    data[inputs[i].name] = inputs[i].value;
  }
  return data;
};

let showSuccessMessage = () => {
  let divElement = createAnyElement("div", { class: "success" });
  divElement.innerHTML = "Sikeres mentés";
  let body = document.getElementsByTagName("body")[0];
  body.insertBefore(divElement, body.firstChild);

  setTimeout(() => {
    divElement.remove();
  }, 10000);
};

export {
  createAnyElement,
  validateForm,
  getRowData,
  showSuccessMessage
};