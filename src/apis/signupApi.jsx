let url = "http://api.dailysportboss.com/signup/register";

class SignupAPI {
  static signupRequest(
    first_name,
    last_name,
    username,
    email,
    password,
    password2,
    address,
    zipcode,
    mobilephone,
    gender,
    birthday,
    subscribe
  ) {
    function changeDateFormat(inputDate) {
      // expects Y-m-d
      var splitDate = inputDate.split("-");
      if (splitDate.count == 0) {
        return null;
      }

      var year = splitDate[0];
      var month = splitDate[1];
      var day = splitDate[2];

      return day + "-" + month + "-" + year;
    }

    const data = `first_name=${encodeURI(first_name)}&last_name=${encodeURI(
      last_name
    )}&username=${encodeURI(username)}&email=${encodeURI(
      email
    )}&password=${encodeURI(password)}&password2=${encodeURI(
      password2
    )}&address=${encodeURI(address)}&zipcode=${encodeURI(
      zipcode
    )}&mobilephone=${encodeURI(mobilephone)}&birthday=${encodeURI(
      changeDateFormat(birthday)
    )}&gender=${encodeURI(gender)}&subscribe=${encodeURI(subscribe)}`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    });
  }
}

export default SignupAPI;
