import { Request, Response, NextFunction } from "express"

export const standardizeResponse = (_: Request, res: Response, next: NextFunction) => {
    const oldJsonFunc = res.json

    res.json = (data) => {

        if (data && data.then) {
            return data.then((responseData: unknown) => {
                res.json = oldJsonFunc

                return oldJsonFunc.call(res, {
                    success: true,
                    result: responseData
                })
            })
        } else {
            res.json = oldJsonFunc

            return oldJsonFunc.call(res, {
                success: true,
                result: data
            })
        }
    }

    next()
}