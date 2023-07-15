import 'package:amazon_clone/models/user_model.dart';
import 'package:flutter/cupertino.dart';

class UserProvider extends ChangeNotifier {
  User _user = User(
      id: "",
      name: "",
      email: "",
      password: "",
      address: "",
      type: "",
      token: "");

  User get user => _user;

  void serUser(String user) {
    _user = User.fromJson(user);
    notifyListeners();
  }
}
