package server.TestServerForClient;

import com.google.gson.annotations.SerializedName;

import java.util.Objects;


public class SerializeNameGson {
    private String name;
    @SerializedName("ema")
    private String email;
    @SerializedName(value = "MOBILE", alternate = {"phone"})
    private String mobile222;

    public SerializeNameGson(String name, String email, String mobile) {
        this.name = name;
        this.email = email;
        this.mobile222 = mobile;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SerializeNameGson that = (SerializeNameGson) o;
        return Objects.equals(name, that.name) &&
                Objects.equals(email, that.email) &&
                Objects.equals(mobile222, that.mobile222);
    }


    @Override
    public String toString() {
        return "SerializeNameGson{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", mobile='" + mobile222 + '\'' +
                '}';
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, email, mobile222);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile222;
    }

    public void setMobile(String mobile) {
        this.mobile222= mobile;
    }
}
