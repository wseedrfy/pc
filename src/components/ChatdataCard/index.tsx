/* eslint-disable */
import { IProduct } from "@/utils/types";
import { Image } from "antd-mobile";
import {Card } from "antd";
import style from './index.module.less';

export default function ChatdataCard({
  data,
}: {
  data: IProduct | undefined;
}) {
  // 渲染商品卡片
  console.log(data);

  return (
    <div>
      {data ? (
        <div className={style.cardContainer}>
          <Card>
            <div className={style.cardContent}>
              <Image
                src={data.coverUrl}
                width={100}
                height={100}
                fit="cover"
                className={style.cardImg}  
              />
              <div style={{ flex: 1 }}>
                <p className={style.cardTitle}>{data.name}</p>
                <p className={style.cardDesc}>{data.desc}</p>

                <div>
                  <span className={style.cardOriginalPrice}>
                    原价：{data.originalPrice}
                  </span>
                  <span className={style.cardPreferentialPrice}>
                    优惠价：{data.preferentialPrice}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div>获取不到商品信息...</div>
      )}
    </div>
  );
}
