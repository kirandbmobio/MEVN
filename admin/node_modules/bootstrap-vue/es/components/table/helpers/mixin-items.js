"use strict";

exports.__esModule = true;
exports.default = void 0;

var _looseEqual = _interopRequireDefault(require("../../../utils/loose-equal"));

var _inspect = require("../../../utils/inspect");

var _normalizeFields = _interopRequireDefault(require("./normalize-fields"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default2 = {
  props: {
    items: {
      // Provider mixin adds in `Function` type
      type: Array,
      default: function _default()
      /* istanbul ignore next */
      {
        return [];
      }
    },
    fields: {
      // Object format is deprecated and should be avoided
      type: [Array, Object],
      default: null
    },
    primaryKey: {
      // Primary key for record.
      // If provided the value in each row must be unique!!!
      type: String,
      default: null
    },
    value: {
      // v-model for retrieving the current displayed rows
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      // Our local copy of the items. Must be an array
      localItems: (0, _inspect.isArray)(this.items) ? this.items.slice() : []
    };
  },
  computed: {
    computedFields: function computedFields() {
      // We normalize fields into an array of objects
      // [ { key:..., label:..., ...}, {...}, ..., {..}]
      return (0, _normalizeFields.default)(this.fields, this.localItems);
    },
    computedFieldsObj: function computedFieldsObj()
    /* istanbul ignore next: not using at the moment */
    {
      // Fields as a simple lookup hash object
      // Mainly for scopedSlots for convenience
      return this.computedFields.reduce(function (f, obj) {
        obj[f.key] = f;
        return obj;
      }, {});
    },
    computedItems: function computedItems() {
      // Fallback if various mixins not provided
      return (this.paginatedItems || this.sortedItems || this.filteredItems || this.localItems || []).slice();
    },
    context: function context() {
      // Current state of sorting, filtering and pagination props/values
      return {
        filter: this.localFilter,
        sortBy: this.localSortBy,
        sortDesc: this.localSortDesc,
        perPage: parseInt(this.perPage, 10) || 0,
        currentPage: parseInt(this.currentPage, 10) || 1,
        apiUrl: this.apiUrl
      };
    }
  },
  watch: {
    items: function items(newItems) {
      /* istanbul ignore else */
      if ((0, _inspect.isArray)(newItems)) {
        // Set localItems/filteredItems to a copy of the provided array
        this.localItems = newItems.slice();
      } else if ((0, _inspect.isUndefined)(newItems) || (0, _inspect.isNull)(newItems)) {
        /* istanbul ignore next */
        this.localItems = [];
      }
    },
    // Watch for changes on computedItems and update the v-model
    computedItems: function computedItems(newVal) {
      this.$emit('input', newVal);
    },
    // Watch for context changes
    context: function context(newVal, oldVal) {
      // Emit context info for external paging/filtering/sorting handling
      if (!(0, _looseEqual.default)(newVal, oldVal)) {
        this.$emit('context-changed', newVal);
      }
    }
  },
  mounted: function mounted() {
    // Initially update the v-model of displayed items
    this.$emit('input', this.computedItems);
  }
};
exports.default = _default2;