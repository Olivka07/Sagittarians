import { createEvent, createStore, sample } from "effector";
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { $debouncedValue, $typesProducts, fetchListTypesProducts, fetchProductListFx } from "entities/product/model/store";
import {debounce} from 'patronum'

const TIME_LIMIT = 600

