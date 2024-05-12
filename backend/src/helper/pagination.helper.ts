import {
  PaginationRequest,
  PaginationResponse,
} from "../types/integration.types";
import { env } from "../env";
import { Model, PipelineStage } from "mongoose";

type FacetPaginationResult<TData> = {
  data: TData[];
  pageInfo: [
    {
      count: number;
    }
  ];
};

export const paginate = async <TDocument, TData = TDocument>(
  document: Model<TDocument>,
  req: PaginationRequest,
  pipeline: PipelineStage[]
) => {
  const page = req.page ?? 1;
  
  return document
    .aggregate<FacetPaginationResult<TData>>([
      ...pipeline,
      {
        $facet: {
          data: [
            {
              $skip: (page - 1) * env.PAGINATION_MAX_ITEMS,
            },
            {
              $limit: env.PAGINATION_MAX_ITEMS,
            },
          ],
          pageInfo: [
            {
              $count: "count",
            },
          ],
        },
      },
    ])
    .exec()
    .then((result) => {
      return {
        data: result[0].data,
        count: result[0].pageInfo[0]?.count ?? 0,
      } as PaginationResponse<TData>;
    });
};
