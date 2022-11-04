export function saveNo(type, number) {
  if (type == "student") {
    localStorage.setItem("account", "student");
    localStorage.setItem("studentNo", JSON.stringify(number))
  } else {
    localStorage.setItem("account", "tutor");
    localStorage.setItem("tutorNo", JSON.stringify(number))
  }
}

export function getNo() {
  const account = localStorage.getItem("account");

  if (account == "student") {
    return localStorage.getItem("studentNo");
  } else if (account == "tutor") {
    return localStorage.getItem("tutorNo");
  }

  return null;
}