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
            label: "Password"
          }
        ]
      },
      {
        id: "r-city",
        fields: [
          {
            id: "city",
            label: "City"
          }
        ]
      },
    ]
  },

  r2: {
    sections: [
      {
        id: "r-address",
        heading: "Address",
        subKey: "address",
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
            id: "state",
            label: "State"
          },
          {
            id: "zip",
            label: "Zip Code"
          }
        ]
      },
      {
        id: "r-username",
        heading: "Username",
        subHeading: "Will be used in your profile url",
        fields: [
          {
            id: "alias",
            label: "Username"
          }
        ]
      },
    ]
  },

  r3: {
    sections: [
      {
        id: "r-ssn",
        heading: "SSN",
        subHeading: "Required for hosts",
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
        id: "r-invite",
        fields: [
          {
            id: "invite",
            label: "Invite Code (Optional)"
          }
        ],
      }
    ]
  }
};

export default screens;
