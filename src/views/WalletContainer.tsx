import React, { useMemo, useState } from "react";
import { Card, Button, Avatar, Typography, List, Tag, Select } from "antd";
import { CopyOutlined, SlidersOutlined, WalletOutlined, RightOutlined } from '@ant-design/icons';
import CustomChart from "../components/Chart.js"
import SelectCustom from "../components/SelectCustom.js";
import { PercentageFormatter, PercentageFormatterV2, NumberFormatter } from "../components/NumberFormater.js";
import useBalanceQuery from "../hooks/useGetNativeBalance.js"

const { Text, Title } = Typography;

const address_list = ['0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326']
const chain_list = ['BCS Chain', 'TON Chain']


function generateMonthlyData(default_value = 10) {
    const data = [];
    const now = new Date();

    for (let i = 7; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        let value = "0.0"
        if (i == 0) {
            value = default_value.toFixed(2)
        } else {
            value = (Math.random() * (default_value - 3) + 3).toFixed(2);
        }
        data.push({ month: `${month} ${year}`, value: parseFloat(value) });
    }

    return data;
}


function WalletContainer() {
    const [selectedChain, setSelectedChain] = useState(chain_list[0])
    const [selectedAddress, setSelectedAddress] = useState(address_list[0])

    const handleChangeAddress = (address: string) => {
        setSelectedAddress(address);
    };

    const handleChangeChain = (selected_value: string) => {
        setSelectedChain(selected_value);
    };

    const copyToClipboard = (text: string): void => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
          }).catch((err) => {
            console.error('Failed to copy text: ', err);
          });
        }
    }
    
    const validateAddress = (address_value: string) => {
        const trimmedAddress = address_value.trim();
        if (trimmedAddress === '') {
            return "Address cannot be empty";
          }

        const pattern = /^0x[a-fA-F0-9]{40}$/;
        if (!pattern.test(trimmedAddress)) {
            return `Invalid ${selectedChain} address format.`
        }
        return ""
    }

    const { data, isLoading, isError, error } = useBalanceQuery(selectedAddress);

    const lineData = useMemo(() => generateMonthlyData(data?.total_wallet), [data]);
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-100 w-1/3 p-4 max-h-full overflow-y-auto">
                <Card>
                    <div className="flex">
                        <SelectCustom selected_value={selectedChain} handleChangeItem={handleChangeChain} list_items={chain_list} placeholder="Select chain" width={200}></SelectCustom>
                        <div>
                            <SelectCustom selected_value={selectedAddress} handleChangeItem={handleChangeAddress} list_items={address_list} placeholder="Select address wallet" label_add_button="Add address"
                            validateAddItem={validateAddress}
                            width={300}></SelectCustom>
                            <Button icon={<CopyOutlined/>} onClick={copyToClipboard(selectedAddress)} />
                        </div>
                    </div>
                    <div className="flex mt-1">
                        <Avatar shape="square" size="large" src={`https://api.dicebear.com/7.x/miniavs/svg?seed=1`} />
                        <div>
                            <Title level={4} className="!mb-0">
                                <NumberFormatter number={data?.total_wallet}></NumberFormatter>
                            </Title>
                            <Text className="flex" type={data?.percent_change_in24h > 0 ? "success" : "danger"}><PercentageFormatter number={data?.percent_change_in24h}></PercentageFormatter>(<NumberFormatter number={data?.total_24h_change}></NumberFormatter>) Today</Text>
                        </div>
                    </div>
                </Card>
                <Card className="mt-4">
                    <CustomChart type="line" data={lineData} config={{ xField: 'month', yField: 'value' }} />
                </Card>
                <div className="flex justify-between my-2">
                    <Title level={5}>Assets</Title>
                    <Button icon={<SlidersOutlined />}/>
                </div>
                <Card>
                    <List
                        header={<div>
                            <div className="flex justify-between">
                                <div>
                                    <WalletOutlined />
                                    <span className="font-bold mx-2">Wallet</span>
                                    <Tag>100.00 %</Tag>
                                </div>
                                <div>
                                    <span className="mr-2 text-slate-400">{data?.tokens?.length}</span>
                                    <RightOutlined className="text-slate-400" />
                                </div>
                            </div>
                            <Title level={4}><NumberFormatter number={data?.total_wallet}></NumberFormatter></Title>
                        </div>}
                        itemLayout="horizontal"
                        dataSource={data?.tokens}
                        renderItem={(item: any, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item?.thumbnail} />}
                                    title={<div className="flex justify-between">
                                        <span>{item?.symbol}</span>
                                        <NumberFormatter number={item?.usdValue}></NumberFormatter>
                                    </div>}
                                    description={
                                        <div className="flex justify-between">
                                            <div>
                                                <span>{item.balanceFormatted} {item.symbol}</span>
                                            </div>
                                            <Text className="flex" type={item?.usdPrice24hrPercentChange > 0 ? "success" : "danger"}>
                                                <PercentageFormatterV2 number={item?.usdPrice24hrPercentChange ?? 0} />
                                                (<NumberFormatter number={item?.usdValue24hrUsdChange ?? 0} />)
                                            </Text>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        </div>
    );
}

export default WalletContainer;