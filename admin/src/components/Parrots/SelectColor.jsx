import React, { useEffect, useState } from 'react';
import colorsFromJson from '../../assets/colors.json';
import { CheckCircleOutlined } from '@ant-design/icons';
import hexsorter from 'hexsorter';
import { green } from '@ant-design/colors';
import ColorItem from './ColorItem';
import { Input } from 'antd';

const SelectColor = ({ getSelectColors, previewImage }) => {
  const [colors, setColors] = useState([]);
  const [selectColors, setSelectColors] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [noFind, setNoFind] = useState(false);
  const [findColors, setFindColors] = useState([]);
  const [currentColorName, setCurrentColorName] = useState('Выберите цвет');

  const sorterColors = (colors) => {
    const sorterColorsArray = colors.map((item) => item.hex);

    const sorterColors = hexsorter
      .sortColors(sorterColorsArray, 'mostBrightColor')
      .reverse();

    let result = [];

    sorterColors.forEach((color) => {
      const find = colors.find((item) => item.hex === color);
      result.push({
        name: find.name,
        hex: find.hex,
        active: find.active || false,
      });
    });

    return result;
  };

  useEffect(() => {
    setColors(sorterColors(colorsFromJson));
  }, []);

  useEffect(() => {
    getSelectColors(selectColors);
  }, [selectColors]);

  const addColor = (color) => {
    const alreadySelectedNames = selectColors.map((item) => item.name);

    const setColorActive = (prev, cond) =>
      prev.map((item) => {
        if (item.name === color.name) {
          return { ...color, active: cond };
        }

        return item;
      });

    if (alreadySelectedNames.includes(color.name)) {
      setSelectColors((prev) => [
        ...prev.filter((item) => item.name !== color.name),
      ]);

      setColors((prev) => setColorActive(prev, false));
      setFindColors((prev) => setColorActive(prev, false));
    } else {
      setSelectColors((prev) => [...prev, { ...color, active: true }]);
      setColors((prev) => setColorActive(prev, true));
      setFindColors((prev) => setColorActive(prev, true));
    }
  };

  useEffect(() => {
    /**
     * Если не нашли таких цветов - "Ничего не найдено"
     */
    setNoFind(!!searchValue.length && !findColors.length);
  }, [searchValue]);

  const searchColors = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    const newColors = colors.filter((item) =>
      item.name.toLowerCase().match(value.toLowerCase())
    );

    setFindColors(sorterColors(value.length ? newColors : []));
  };

  return (
    <div>
      <div className="parrots__add-form-color-preview-wrapper">
        <img
          className="parrots__add-form-color-preview"
          src={previewImage}
          alt={'Попугай'}
        />
      </div>
      <Input placeholder="Find color" onChange={searchColors} />
      <div className="parrots__add-form-color-current">
        {!!currentColorName && currentColorName}
      </div>
      <div className="parrots__add-form-color-wrapper">
        {noFind ? `Цвет с названием ${searchValue} - не найден` : null}
        {!noFind &&
          (!!findColors.length ? findColors : colors).map((color) => (
            <ColorItem
              color={color}
              onClick={() => addColor(color)}
              onMouseEnter={() => setCurrentColorName(color.name)}
              disabled={findColors.length}
            >
              {!!color.active && (
                <CheckCircleOutlined
                  style={{ color: green.primary }}
                  className="parrots__add-form-color-check"
                />
              )}
            </ColorItem>
          ))}
      </div>
    </div>
  );
};

export default SelectColor;
