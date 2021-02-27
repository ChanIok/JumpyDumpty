{
  "targets": [
        {
      "target_name": "SwitchToWindow",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [ "./cpp/SwitchToWindow.cpp" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    },
    {
      "target_name": "ScreenShot",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [ "./cpp/ScreenShot.cpp" ],

      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "C://Program Files (x86)/Microsoft Visual Studio/2017/Community/VC/Tools/MSVC/14.16.27023/atlmfc/include"
      ],
  'libraries': ['C://Program Files (x86)/Microsoft Visual Studio/2017/Community/VC/Tools/MSVC/14.16.27023/atlmfc/lib/x64/nafxcw.lib',
  'C://Program Files (x86)/Microsoft Visual Studio/2017/Community/VC/Tools/MSVC/14.16.27023/atlmfc/lib/x64/atls.lib'],
      
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}
