import React, { useCallback } from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import FormEdit from './FormEdit';
import { plan } from 'configs';
import { Ui } from 'utils/Ui';
import { message } from 'antd';

const Update = ({ className,
    onHiddenModalTripPlan,
    onRefreshList,
    itemTripSelected,
    stations,
    province,
    isShowModalTripPlan,
    setData,
    scheduleTrip,
    setScheduleTrip,
    data,
    allRoute }) => {

    // console.log(data);

    const onSave = useCallback(async (values) => {
        // console.log(values);
        const payload = {
            schedule: values?.schedule,
            type_apply: values?.type_apply
        };
        // console.log(payload);
        plan.updateAssignNode(itemTripSelected?.id, payload).then(res => {
            Ui.showSuccess({ message: "Thành công" });
            onHiddenModalTripPlan();
            // let dataClone = _.cloneDeep(data);
            // dataClone.find(item => item.id === itemTripSelected?.id && (item.schedule = payload?.schedule, true) && (item.type_apply.id = payload?.type_apply, true));
            // setData(dataClone)
            onRefreshList();
        }).catch(err => {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra !')
        });
    });

    return (
        <div className={className}>
            <FormEdit
                itemTripSelected={itemTripSelected}
                onSave={onSave}
                isShowModalTripPlan={isShowModalTripPlan}
                onHiddenModalTripPlan={onHiddenModalTripPlan}
                scheduleTrip={scheduleTrip}
                setScheduleTrip={setScheduleTrip}
            // stations={stations}
            // allRoute={allRoute}
            />
        </div>
    );
};

Update.propTypes = {
    className: PropTypes.any,
};
export default styled(Update)`
      
  `;