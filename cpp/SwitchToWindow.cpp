#include <windows.h>
#include <node_api.h>


char *UTF_8_To_Unicode(const char *Utf8String)
{
	//预转换，得到所需空间的大小;
	int UnicodeWideCharLen = ::MultiByteToWideChar(CP_UTF8, NULL, Utf8String, strlen(Utf8String), NULL, 0);

	//分配空间要给'\0'留个空间，MultiByteToWideChar不会给'\0'空间
	wchar_t *UnicodeWideChar = new wchar_t[UnicodeWideCharLen + 1];

	//转换
	::MultiByteToWideChar(CP_UTF8, NULL, Utf8String, strlen(Utf8String), UnicodeWideChar, UnicodeWideCharLen);

	//加上'\0'
	UnicodeWideChar[UnicodeWideCharLen] = '\0';

	//获取宽字节字符的大小，按字节计算
	int len = WideCharToMultiByte(CP_ACP, 0, UnicodeWideChar, UnicodeWideCharLen, NULL, 0, NULL, NULL);
	//以字节为单位
	char *UnicodeString = new char[len];
	//宽字节编码转换成多字节编码
	WideCharToMultiByte(CP_ACP, 0, UnicodeWideChar, UnicodeWideCharLen, UnicodeString, len, NULL, NULL);
	//加上'\0'
	UnicodeString[len] = '\0';
	return UnicodeString;
}

static napi_value Switch(napi_env env, napi_callback_info info)
{
	napi_status status;
	HWND window;

	size_t argc = 2;
	napi_value args[2];
	status = napi_get_cb_info(env, info, &argc, args, NULL, NULL);

	// 第一个参数
	char str1[256];
	size_t str_len1;
	status = napi_get_value_string_utf8(env, args[0], (char *)&str1, 256, &str_len1);
	str1[str_len1] = '\0';

	// 第二个参数
	char str2[256];
	size_t str_len2;
	status = napi_get_value_string_utf8(env, args[1], (char *)&str2, 256, &str_len2);
	str2[str_len2] = '\0';

	// 将第二个参数转换成unicode
	char *str3 = UTF_8_To_Unicode(str2);

	// 获取窗口句柄
	window = FindWindow(str1, str3);
	SwitchToThisWindow(window, TRUE);

	// 没什么用的返回值
	napi_value ReturnValue;
	status = napi_create_string_utf8(env, str2, str_len2, &ReturnValue);

	return ReturnValue;
}

#define DECLARE_NAPI_METHOD(name, func)         \
	{                                           \
		name, 0, func, 0, 0, 0, napi_default, 0 \
	}

napi_value Init(napi_env env, napi_value exports)
{
	napi_status status;
	napi_property_descriptor switchToWindow = DECLARE_NAPI_METHOD("switch", Switch);
	status = napi_define_properties(env, exports, 1, &switchToWindow);
	return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)