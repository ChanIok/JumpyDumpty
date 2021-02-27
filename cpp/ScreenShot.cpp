#include <tchar.h>
#include <afxwin.h>
#include <node_api.h>
#include <windows.h>

#define WIN32_LEAN_AND_MEAN

int ScreenCatch(char *ClassName, char *WindowName, double WidthRatio, double HeightRatio, double XPosRatio, double YPosRatio)
{

	CDC *pDC;

	HWND window;
	RECT rect;

	window = FindWindow(ClassName, WindowName);
	// window = FindWindow("UnityWndClass", "原神");
	// SwitchToThisWindow(window, TRUE);

	pDC = CDC::FromHandle(GetDC(window));

	GetClientRect(window, &rect);
	int BitPerPixel = pDC->GetDeviceCaps(BITSPIXEL);

	int Width = WidthRatio * (rect.right - rect.left);
	int Height = HeightRatio * (rect.bottom - rect.top);

	CDC memDC;
	memDC.CreateCompatibleDC(pDC);

	CBitmap memBitmap, *oldmemBitmap;
	memBitmap.CreateCompatibleBitmap(pDC, Width, Height);

	oldmemBitmap = memDC.SelectObject(&memBitmap);
	memDC.BitBlt(0, 0, Width, Height, pDC, XPosRatio * (rect.right - rect.left), YPosRatio * (rect.bottom - rect.top), SRCCOPY);

	BITMAP bmp;
	memBitmap.GetBitmap(&bmp);

	if (OpenClipboard(NULL))
	{
		EmptyClipboard();
		SetClipboardData(CF_BITMAP, memBitmap);
		CloseClipboard();
		return 0;
	}
	return -1;
}

char *UTF_8_To_Unicode(const char *Utf8String)
{
	int UnicodeWideCharLen = ::MultiByteToWideChar(CP_UTF8, NULL, Utf8String, strlen(Utf8String), NULL, 0);

	wchar_t *UnicodeWideChar = new wchar_t[UnicodeWideCharLen + 1];

	::MultiByteToWideChar(CP_UTF8, NULL, Utf8String, strlen(Utf8String), UnicodeWideChar, UnicodeWideCharLen);

	UnicodeWideChar[UnicodeWideCharLen] = '\0';
	int len = WideCharToMultiByte(CP_ACP, 0, UnicodeWideChar, UnicodeWideCharLen, NULL, 0, NULL, NULL);
	char *UnicodeString = new char[len];
	WideCharToMultiByte(CP_ACP, 0, UnicodeWideChar, UnicodeWideCharLen, UnicodeString, len, NULL, NULL);
	UnicodeString[len] = '\0';
	return UnicodeString;
}

static napi_value Shot(napi_env env, napi_callback_info info)
{
	napi_status status;

	size_t argc = 6;
	napi_value args[6];
	status = napi_get_cb_info(env, info, &argc, args, NULL, NULL);

	// 窗口类名
	char str1[128];
	size_t str_len1;
	status = napi_get_value_string_utf8(env, args[0], (char *)&str1, 128, &str_len1);
	str1[str_len1] = '\0';

	// 窗口名
	char str2[128];
	size_t str_len2;
	status = napi_get_value_string_utf8(env, args[1], (char *)&str2, 128, &str_len2);
	str2[str_len2] = '\0';

	// 将第二个参数转换成unicode
	char *str2_u = UTF_8_To_Unicode(str2);

	// 截取宽度比例
	double value3;
	status = napi_get_value_double(env, args[2], &value3);

	// 截取高度比例
	double value4;
	status = napi_get_value_double(env, args[3], &value4);

	// 截取起始坐标X比例
	double value5;
	status = napi_get_value_double(env, args[4], &value5);

	// 截取起始坐标Y比例
	double value6;
	status = napi_get_value_double(env, args[5], &value6);

	int res = ScreenCatch(str1, str2_u, value3, value4, value5, value6);

	// 没什么用的返回值
	napi_value ReturnValue;
	status = napi_create_int32(env, res, &ReturnValue);

	return ReturnValue;
}

#define DECLARE_NAPI_METHOD(name, func)         \
	{                                           \
		name, 0, func, 0, 0, 0, napi_default, 0 \
	}

napi_value Init(napi_env env, napi_value exports)
{
	napi_status status;
	napi_property_descriptor screenShot = DECLARE_NAPI_METHOD("shot", Shot);
	status = napi_define_properties(env, exports, 1, &screenShot);
	return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)