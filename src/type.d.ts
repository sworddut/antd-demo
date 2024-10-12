declare global {
    type MenuItem = {
        label: string;
        key: string;
        icon?: React.ReactNode;
        children?: MenuItem[];
      };
      
      type UserData = {
        id: string;
        name: string;
        age: number;
      };
      
      type TeamData = {
        id: string;
        name: string;
        teammateinfos: Teammateinfo[];
      };
      
      type Teammateinfo = {
        name: string;
        age: number;
        address: string;
        tags: Array<"前锋" | "中场" | "后卫" | "门将">; // 定义为一个字符串数组，内容限定为几种特定类型
      };

      type TeamProps = {
        info: {
          id: string;
          name: string;
          teammates: string[];
        };
      };
}

export {};