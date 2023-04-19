import moment from "moment";
import _ from "lodash"
import React, { memo, useState, useCallback } from "react";

export const formatParams =  (param) => {
    let result = {
        limit: param.limit ? param.limit : undefined ,
        page: param.page ? param.page : undefined,
        name: param.query ? param.query : undefined,
    };

    return result
}

export const formatBody =  (body) => {
    let result = _.map(body['permissions'], (i) => {
        return i.id ? i.id : i
    })
    body['permissions'] = result
    return body
}