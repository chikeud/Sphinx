/**
 * @author EmmanuelOlaojo
 * @since 6/3/18
 */


let screens = {
  r1: {
    sections: [
      {
        id: "r-name",
        fields: [
          {
            id: "fName",
            label: "First Name"
          },
          {
            id: "lName",
            label: "Last Name"
          },
        ]
      },
      {
        id: "r-contact",
        fields: [
          {
            id: "email",
            label: "Email"
          },
          {
            id: "phone",
            label: "Phone"
          },
          {
            id: "password",
            label: "Password",
            type: "password"
          }
        ]
      },
      {
        id: "r-invite",
        fields: [
          {
            id: "invite",
            label: "Invite Code (Optional)"
          }
        ],
      }
    ]
  },

  r2: {
    sections: [
      {
        id: "r-address",
        fields: [
          {
            id: "street",
            label: "Street"
          },
          {
            id: "suite",
            label: "Suite (Optional)"
          },
          {
            id: "city",
            label: "City"
          },
          {
            id: "state",
            label: "State"
          },
          {
            id: "zip",
            label: "Zip Code"
          }
        ]
      },
    ]
  },

  r3: {
    sections: [
      {
        id: "r-ssn",
        fields: [
          {
            id: "ssn",
            label: "xxx-xx-xxxx"
          }
        ]
      }
    ]
  },

  r4: {
    sections: [
      {
        id: "r-username",
        fields: [
          {
            id: "alias",
            label: "Username"
          }
        ]
      },
    ]
  }
};

let rProps = (() => {
  let views = Object.keys(screens);
  let result = {};

  for(let view of views){
    for(let section of screens[view].sections){
      for(let field of section.fields){
        if(!result[view]){
          result[view] = [field.id];
        }
        else{
          result[view].push(field.id);
        }
      }
    }
  }

  return result;
})();

export {screens as rScreens, rProps} ;
