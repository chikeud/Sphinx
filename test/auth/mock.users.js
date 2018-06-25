/**
 * @author EmmanuelOlaojo
 * @author King David Lawrence
 * @since 5/18/18
 */

exports.user1 = {
  alias: "e-oj",
  isHost: false,
  isRenter: true,
  email: "e-oj@fakemail.com",
  password: "password",
  firstName: "Emmanuel",
  lastName: "Olaojo",
  phone: "8888888888",
  address: {
    street: "State Street",
    city: "Boston",
    state: "Massachusetts",
    zip: "14720",
    houseNum: "300"
  }
};

exports.user2 = {
  alias: "bezinsky",
  isHost: false,
  isRenter: true,
  email: "bezinsky@fakemail.com",
  password: "password",
  firstName: "Jeff",
  lastName: "Bezos",
  phone: "888-888-8888",
  address: {
    street: "State Street",
    city: "Rochester",
    state: "New York",
    zip: "14620",
    houseNum: "300"
  }
};

exports.user3 = {
  alias: "Chinky",
  isHost: true,
  isRenter: false,
  email: "chink@fakemail.com",
  password: "password",
  firstName: "Chin",
  lastName: "Chan",
  phone: "888-888-8888",
  address: {
    street: "State Street",
    city: "Boston",
    state: "Massachusetts",
    zip: "14620",
    houseNum: "200"
  },
  ssn: "131-76-8965"
};

exports.edited = {
    alias: "Edited",
    isHost: false,
    isRenter: true,
    email: "fakenews@mail.com",
    password: "changed_password",
    firstName: "Jonah",
    lastName: "Whale",
    phone: "8888888887",
    address: {
        street: "Edited Street",
        city: "Edited City",
        state: "Edited State",
        zip: "14623",
        houseNum: "P12"
    },
    ssn: "123-45-6789"
};

exports.toEdit = {
    alias: "Weed_man",
    isHost: false,
    isRenter: true,
    email: "endtimes@mail.com",
    password: "password",
    firstName: "False",
    lastName: "Witness",
    phone: "8888888888",
    address: {
        street: "Plug Walk NY",
        city: "New York City",
        state: "New York",
        zip: "14623",
        houseNum: "419"
    },
    ssn: "223-45-6789"
};

exports.exists = {
    alias: "Edited1",//unique
    isHost: true,
    isRenter: false,
    email: "fakenews@mail.com2",//unique
    password: "changed_password",
    firstName: "Jonah",
    lastName: "Whale",
    phone: "8888888887",
    address: {
        street: "Edited Street",
        city: "Edited City",
        state: "Edited State",
        zip: "14623",
        houseNum: "P12"
    },
    ssn: "123-45-6788"//unique
};