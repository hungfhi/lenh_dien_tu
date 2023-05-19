import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import FormEdit from './FormEdit';

const Update = ({ className,
    onHiddenModalEdit,
    onRefreshList,
    itemSelected,
    onRefresh,
    stations,
    province,
    allRoute }) => {
    return (
        <div className={className}>
            <FormEdit
                itemSelected={itemSelected}
                onRefreshList={onRefreshList}
                // onSave={onSave}
                onHiddenModal={onHiddenModalEdit}
                stations={stations}
                allRoute={allRoute}
            />
        </div>
    );
};

Update.propTypes = {
    className: PropTypes.any,
};
export default styled(Update)`
      
  `;