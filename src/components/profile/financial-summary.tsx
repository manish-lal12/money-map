import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { BsCashStack } from "react-icons/bs";
import { TrendingUp, TrendingDown } from "lucide-react";
import { MdOutlineSavings } from "react-icons/md";
import { TbTax } from "react-icons/tb";

export const FinancialSummary = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NetWorth</CardTitle>
            <BsCashStack className="text-3xl text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              <span>&#8377;</span>20,000
            </div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp />
              <span>+8.5% up from last year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tax Returns</CardTitle>
            <TbTax className="text-3xl text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              <span>&#8377;</span>1,00,000
            </div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp />
              <span>+8.5% up from last year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <MdOutlineSavings className="text-3xl text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              <span>&#8377;</span>5,00,000
            </div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp />
              <span>+8.5% up from last year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Expenses
            </CardTitle>
            <TrendingDown className="text-3xl text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              <span>&#8377;</span>1,00,000
            </div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingDown />
              <span>+8.5% up from last year</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// <div className="p-4">
//   <h2 className="text-2xl font-bold mb-4">Financial Summary</h2>
//   <BarChart
//     width={600}
//     height={300}
//     data={data}
//     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//   >
//     <CartesianAxis strokeDasharray="3 3" />
//     <XAxis dataKey="year" />
//     <YAxis />
//     <Bar
//       dataKey="taxReturns"
//       fill="#8884d8"
//       onClick={handleClick}
//       isAnimationActive={false}
//     >
//       {data.map((entry, index) => (
//         <Cell
//           key={`cell-${index}`}
//           fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
//         />
//       ))}
//     </Bar>
//     <Tooltip content={CustomTooltip} />
//   </BarChart>
// </div>

// const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="">
//         <span>{label}</span>
//         <br />
//         {payload.map((item, index) => (
//           <div key={index}>
//             <small key={index} className="text-gray-500">
//               Tax Returns: {item.value}
//             </small>
//             <br />
//           </div>
//         ))}
//       </div>
//     );
//   }
// };
