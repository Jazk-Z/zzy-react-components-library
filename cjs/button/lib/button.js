"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var react_1 = __importDefault(require("react")); // import PropTypes from 'prop-types'


var classnames_1 = __importDefault(require("classnames")); // type Props = {
//   name?: string
// }
// FunctionComponent === FC


var prefixCls = 'zbtn';

var Button = function Button(_ref) {
  var _classnames_1$default;

  var children = _ref.children,
      handleClick = _ref.onClick,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'primary' : _ref$type,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'default' : _ref$size,
      _ref$shape = _ref.shape,
      shape = _ref$shape === void 0 ? 'circle' : _ref$shape,
      className = _ref.className;
  var classNames = classnames_1.default(prefixCls, className, (_classnames_1$default = {}, (0, _defineProperty2.default)(_classnames_1$default, "".concat(prefixCls, "-").concat(type), type), (0, _defineProperty2.default)(_classnames_1$default, "".concat(prefixCls, "-").concat(shape), shape), (0, _defineProperty2.default)(_classnames_1$default, "".concat(prefixCls, "-").concat(size), size), _classnames_1$default));
  return react_1.default.createElement("button", {
    onClick: handleClick,
    className: classNames,
    type: "button"
  }, children);
}; // Button.propTypes = {
//   onClick: PropTypes.func,
//   type: PropTypes.string,
//   size: PropTypes.string,
//   shape: PropTypes.string
// }


Button.defaultProps = {};
exports.default = Button;
//# sourceMappingURL=button.js.map
