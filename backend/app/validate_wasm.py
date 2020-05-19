from base64 import b64decode
from wasmer import Module, ExportKind

def validate_wasm(base64_encoded_bot):
    try:
        wasm_bytes = b64decode(base64_encoded_bot)
        module = Module(wasm_bytes)
    except:
        # invalid base64 or wasm
        return False

    # module should not require any imports
    if module.imports != []:
        return False

    # module should only export makeMove
    exports = [f["name"] for f in module.exports if f["kind"] == ExportKind.FUNCTION]
    return exports == ["makeMove"]
