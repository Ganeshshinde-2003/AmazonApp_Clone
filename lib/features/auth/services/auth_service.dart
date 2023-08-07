// ignore_for_file: use_build_context_synchronously

import 'dart:convert';
import 'package:amazon_clone/common/widgets/bottom_bar.dart';
import 'package:amazon_clone/contants/error_handling.dart';
import 'package:amazon_clone/contants/globlal_varible.dart';
import 'package:amazon_clone/contants/utils.dart';
import 'package:amazon_clone/models/user_model.dart';
import 'package:amazon_clone/providers/user_provider.dart';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../admin/screens/admin_screen.dart';

class AuthService {
  void signUpUser({
    required BuildContext context,
    required String email,
    required String password,
    required String name,
  }) async {
    try {
      User user = User(
        id: '',
        name: name,
        password: password,
        email: email,
        address: '',
        type: '',
        token: '',
      );

      http.Response res = await http.post(
        Uri.parse('$uri/api/signup'),
        body: user.toJson(),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () {
          showSnackBar(
            context,
            'Account created! Login with the same credentials!',
          );
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }

  Future<void> signInUser({
    required BuildContext context,
    required String email,
    required String password,
  }) async {
    try {
      http.Response res = await http.post(
        Uri.parse('$uri/api/signin'),
        body: jsonEncode({
          "email": email,
          "password": password,
        }),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () async {
          final responseBody = jsonDecode(res.body);
          SharedPreferences prefs = await SharedPreferences.getInstance();

          // Set user token and data in provider
          Provider.of<UserProvider>(context, listen: false).setUser(res.body);

          await prefs.setString("x-auth-token", responseBody['token']);

          var userType = responseBody['type'];

          Navigator.pushNamedAndRemoveUntil(
            context,
            userType == 'user' ? BottomBar.routeName : AdminScren.routeName,
            (route) => false,
          );
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }

  void getUserData(BuildContext context) async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      String? token = prefs.getString('x-auth-token');

      if (token == null) {
        prefs.setString('x-auth-token', "");
        return;
      }

      var tokenRes = await http
          .post(Uri.parse("$uri/tokenInValid"), headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'x-auth-token': token,
      });

      var response = jsonDecode(tokenRes.body);

      if (response == true) {
        http.Response userRes =
            await http.get(Uri.parse("$uri/"), headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'x-auth-token': token,
        });

        var userProvider = Provider.of<UserProvider>(context, listen: false);
        userProvider.setUser(userRes.body);
      }
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}
